import Title from "@/shared/ui/Title";
import React from "react";
import { useParams } from "react-router-dom";
import { usePartner } from "../service/usePartner";

const DetialPartner = () => {
  const { id } = useParams<{ id: string }>();
  const { getOnePartner } = usePartner();
  const { data, isLoading, error } = getOnePartner(id!);
  console.log(data);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[150px] bg-gray-100 rounded-lg">
        <span className="text-lg text-gray-600">Yuklanmoqda...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[150px] bg-gray-100 rounded-lg">
        <span className="text-lg text-red-500">Xatolik yuz berdi</span>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <Title className="text-2xl font-bold text-gray-800 mb-6">
        Foydalanuvchi Ma'lumotlari
      </Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
          <span className="font-medium text-gray-700 text-sm">Ism</span>
          <p className="mt-1 text-gray-600">{data.fullname}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
          <span className="font-medium text-gray-700 text-sm">Telefon</span>
          <p className="mt-1 text-gray-600">{data.phone.join(", ")}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
          <span className="font-medium text-gray-700 text-sm">Balans</span>
          <p className="mt-1 text-gray-600">{data.balance}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
          <span className="font-medium text-gray-700 text-sm">Manzil</span>
          <p className="mt-1 text-gray-600">{data.adress}</p>
        </div>
        {data.location && (
          <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <span className="font-medium text-gray-700 text-sm">Lokatsiya</span>
            <p className="mt-1 text-gray-600">
              {data.location.lat}, {data.location.lng}
            </p>
          </div>
        )}
        <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
          <span className="font-medium text-gray-700 text-sm">Role</span>
          <p className="mt-1 text-gray-600">{data.role}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
          <span className="font-medium text-gray-700 text-sm">Faollik</span>
          <p
            className={`mt-1 px-2 py-1 rounded text-sm ${
              data.isActive
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {data.isActive ? "Aktiv" : "Nofaol"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DetialPartner);
