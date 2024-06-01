"use client"

import AddCoupon from "@/components/shared/SubComponents/Sales/AddCoupon";
import CouponTable from "@/components/shared/SubComponents/Sales/CouponTable";

const Coupons = () => {

   return (
      <div className="mt-1">
         
            <AddCoupon></AddCoupon>
         
            <CouponTable></CouponTable>
         
      </div>
   );
};

export default Coupons;