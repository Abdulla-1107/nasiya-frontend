import { useAuth } from "@/features/auth/service/useAuth";
import Box from "@/shared/ui/Box";
import Title from "@/shared/ui/Title";
import React from "react";

const Profile = () => {
  const { getMe } = useAuth();
  const { data, isLoading, error } = getMe();

  if (isLoading)
    return (
      <Box>
        <div className="flex justify-center items-center min-h-[150px] bg-gray-100 rounded-lg">
          <span className="text-lg text-gray-600">Yuklanmoqda...</span>
        </div>
      </Box>
    );

  if (error)
    return (
      <Box>
        <div className="flex justify-center items-center min-h-[150px] bg-gray-100 rounded-lg">
          <span className="text-lg text-red-500">Xatolik yuz berdi</span>
        </div>
      </Box>
    );

  if (!data)
    return (
      <Box>
        <div className="flex justify-center items-center min-h-[150px] bg-gray-100 rounded-lg">
          <span className="text-lg text-gray-500">Ma'lumotlar topilmadi</span>
        </div>
      </Box>
    );

  return (
    <Box>
      <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <Title className="text-2xl font-bold text-gray-800 mb-6">Profil</Title>
        {data.image && (
          <div className="flex justify-center mb-6">
            <img
              src={data.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border border-gray-200"
            />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <span className="font-medium text-gray-700 text-sm">Ism</span>
            <p className="mt-1 text-gray-600">{data.fname || "Noma'lum"}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <span className="font-medium text-gray-700 text-sm">Familiya</span>
            <p className="mt-1 text-gray-600">{data.lname || "Noma'lum"}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <span className="font-medium text-gray-700 text-sm">
              Foydalanuvchi nomi
            </span>
            <p className="mt-1 text-gray-600">{data.username || "Noma'lum"}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <span className="font-medium text-gray-700 text-sm">Telefon</span>
            <p className="mt-1 text-gray-600">{data.phone || "Noma'lum"}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <span className="font-medium text-gray-700 text-sm">Balans</span>
            <p className="mt-1 text-gray-600">{data.balance || 0}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <span className="font-medium text-gray-700 text-sm">Role</span>
            <p className="mt-1 text-gray-600">{data.role || "Noma'lum"}</p>
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
    </Box>
  );
};

export default React.memo(Profile);
