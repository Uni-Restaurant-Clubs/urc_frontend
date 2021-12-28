import React, { useEffect, useState } from "react";
import {
} from "@ionic/react";

const DealInfo: React.FC<{ deal: string, perks: string}> = ({ deal, perks}) => {

  return (
    <>
      <p>{deal}</p>
      <p>{perks}</p>
    </>
  );
};

export default DealInfo;
