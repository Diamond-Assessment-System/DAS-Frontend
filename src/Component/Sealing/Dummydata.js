// src/dummyData.js
export const createDummyData = () => {
    const diamonds = [
      { orderId: 1, diamondId: 'DIA001', customerName: 'John Doe', status: 'Pending' },
      { orderId: 2, diamondId: 'DIA002', customerName: 'Jane Smith', status: 'Pending' },
      { orderId: 3, diamondId: 'DIA003', customerName: 'Mike Johnson', status: 'Pending' },
      { orderId: 4, diamondId: 'DIA004', customerName: 'Chris Lee', status: 'Pending' },
      { orderId: 5, diamondId: 'DIA005', customerName: 'Anna Brown', status: 'Pending' },
      { orderId: 6, diamondId: 'DIA006', customerName: 'Emily Davis', status: 'Pending' },
      { orderId: 7, diamondId: 'DIA007', customerName: 'Daniel Wilson', status: 'Pending' },
      { orderId: 8, diamondId: 'DIA008', customerName: 'Sophia Garcia', status: 'Pending' },
      { orderId: 9, diamondId: 'DIA009', customerName: 'David Martinez', status: 'Pending' },
      { orderId: 10, diamondId: 'DIA010', customerName: 'Emma Lopez', status: 'Pending' }
    ];
  
    localStorage.setItem('diamonds', JSON.stringify(diamonds));
  };
  