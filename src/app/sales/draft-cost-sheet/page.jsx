"use client"
import CreateDraftCostSheet from '@/components/shared/SubComponents/Sales/CreateDraftCostSheet';
import DraftCostSheetTable from '@/components/shared/SubComponents/Sales/DraftCostSheetTable';


const DraftCostSheet = () => {
   return (
      <div className='mt-10'>

         <CreateDraftCostSheet></CreateDraftCostSheet>

         <DraftCostSheetTable></DraftCostSheetTable>

      </div>
   );
};

export default DraftCostSheet;