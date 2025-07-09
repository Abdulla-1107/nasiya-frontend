import Box from "@/shared/ui/Box";
import Title from "@/shared/ui/Title";
import React from "react";
import { useProfile } from "../service/useProfile";
import { useAuth } from "@/features/auth/service/useAuth";

const Profile = () => {
  const { getBuy } = useProfile();
  const { getMe } = useAuth();
  const { data } = getMe();

  getBuy({});

  if (!data) {
    return (
      <Box>
        <Title>Yuklanmoqda...</Title>
      </Box>
    );
  }

  return (
    <Box className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <Title>Profil</Title>
      <div className="flex flex-col items-center mt-4">
        <img
          src={data.image}
          alt="Profil rasmi"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 shadow-sm"
        />
        <h2 className="mt-4 text-xl font-semibold">
          {data.fname} {data.lname}
        </h2>
        <p className="text-gray-600 mt-1">@{data.username}</p>

        <div className="w-full mt-6 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Telefon:</span>
            <span>{data.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Rol:</span>
            <span className="capitalize">{data.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Balans:</span>
            <span>{data.balance} so'm</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Holat:</span>
            <span className={data.isActive ? "text-green-600" : "text-red-600"}>
              {data.isActive ? "Aktiv" : "Aktiv emas"}
            </span>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default React.memo(Profile);
