// src/components/Sealing/Dummydata.js
export const createDummyData = () => {
  const diamonds = [
    {
      orderId: 1,
      diamondId: 'D001',
      customerName: 'John Doe',
      status: 'Pending',
    },
    {
      orderId: 2,
      diamondId: 'D002',
      customerName: 'Jane Smith',
      status: 'Pending',
    },
    {
      orderId: 3,
      diamondId: 'D003',
      customerName: 'Alice Johnson',
      status: 'Pending',
    },
  ];
  localStorage.setItem('diamonds', JSON.stringify(diamonds));
};
