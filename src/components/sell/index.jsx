import { Button, Input, Modal } from 'antd';
import { useState } from 'react';

const SellModal = ({ isModalOpen, handleCancel, handleOk,price,setPrice ,data}) => {
console.log(data);

  return (
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="sell">
      <label>Sold Price </label>
      <Input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}/>
    </Modal>
  );
};

export default SellModal;
