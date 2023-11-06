import { useEffect } from 'react';
import { Categorysearch } from '../../service';

const CategoryChart = () => {
  const getCategories = async () => {
    const response = await Categorysearch();
    console.log(response);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return <div></div>;
};

export default CategoryChart;
