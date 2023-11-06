import { Photo } from '@/components/Photo';
import { useEffect } from 'react';

const MyProfile = ({ data }) => {
  console.log(data);
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems:"center" }}
    >
      <Photo src={data?.image} />
      <br />
      <br />
      <div style={{width:"fit-content", display:"grid", justifyItems:"center"}}>
        <span><strong>UserName:</strong>  {data?.username}</span>
        <span><strong> First Name:</strong> {data?.firstName}</span>
        <span><strong>Last Name: </strong> {data?.lastName}</span>
        <span><strong>Email:</strong> {data?.email}</span>
        <span><strong>Phone Number:</strong> Phone Number: {data?.phoneNumber}</span>
      </div>
    </div>
  );
};

export default MyProfile;
