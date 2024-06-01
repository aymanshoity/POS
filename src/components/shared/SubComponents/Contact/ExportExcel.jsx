import * as XLSX from 'xlsx';

const ExportExcel = (data,value,type) => {
   console.log(data,value,type)
   const dataToExport = data?.map((contact) => ({
      Name: contact?.name,
      Phone: contact?.phone,
      Email: contact?.email,
      Address: contact?.address,
      Type: contact?.role,
   }));

   const workbook = XLSX.utils.book_new();
   const worksheet = XLSX.utils.json_to_sheet(dataToExport);
   XLSX.utils.book_append_sheet(workbook, worksheet, value);
   console.log(`Exported data to ${type}.xlsx`);
   XLSX.writeFile(workbook, `${type}.xlsx`);
   
};

export default ExportExcel;