import Box from "@/shared/ui/Box";
import Title from "@/shared/ui/Title";
import React from "react";
import { usePartner } from "../service/usePartner";
import Navigation from "../components/navigation/Navigation";
import PartnerWrapper from "../components/partner-wrapper/PartnerWrapper";
import { useParamsHook } from "@/shared/hooks/useParamsHook";
import { Badge } from "antd";

const Partner = ({ role }: { role: string }) => {
  const { getPartners } = usePartner();
  const {getParam} = useParamsHook()
  const page = getParam("page") || "1"
  const { data, isFetching } = getPartners({ role, page, sortOrder:"desc"});

  return (
    <Box>
      <Badge count={data?.total} style={{ backgroundColor: '#000' }}>
        <Title className={"mb-4"}>
          {role === "customer" ? "Mijozlar" : "Sotuvchilar"} ro'yhati
        </Title>
      </Badge>
      <Navigation />
      <PartnerWrapper data={data} loading={isFetching}/>
    </Box>
  );
};

export default React.memo(Partner);
