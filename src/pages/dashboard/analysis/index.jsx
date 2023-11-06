import { Suspense, useEffect, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import IntroduceRow from './components/IntroduceRow';
import SalesCard from './components/SalesCard';
import TopSearch from './components/TopSearch';
import ProportionSales from './components/ProportionSales';
import OfflineData from './components/OfflineData';
import { useRequest } from 'umi';
import { blogscount, fakeChartData, propertyFilter, propertycount, purchasecount, usercount } from './service';
import PageLoading from './components/PageLoading';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';
import { Pie } from '@ant-design/charts';
import DonutPlot from './components/Charts/Donut';
import CategoryChart from './components/Charts/CategoryChart';

const Analysis = () => {
  const [salesType, setSalesType] = useState('all');
  const [currentTabKey, setCurrentTabKey] = useState('');
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('year'));
  const { loading, data } = useRequest(fakeChartData);
const [property, setProperty]= useState();
const [saleCount, setSaleCount]= useState();
const [rentCount, setRentCount]= useState();

const [blogCount, setBlogCount]= useState();
const [userCount, setUserCount]= useState();

const [propertyPurchaseCount, setPropertyPurchaseCount]= useState();


  const selectDate = (type) => {
    setRangePickerValue(getTimeDistance(type));
  };

  const handleRangePickerChange = (value) => {
    setRangePickerValue(value);
  };
  
  const fetchPropertyCount = async () => {
    const result = await propertycount({roleAlias:"Super Admin"});
    console.log(result);
    setProperty(result.total);
  };
  const fetchProperty = async () => {
    const result = await propertyFilter({roleAlias:"Super Admin",limit:"0"});
    const filterRent= result.data.filter((rent)=>rent.purpose ==="rent")
    setRentCount(filterRent?.length || 0);
    const filterSale= result.data.filter((rent)=>rent.purpose ==="sale")
    setSaleCount(filterSale?.length ||0);

  };
    const fetchBlogCount = async () => {
    const result = await blogscount({roleAlias:"Super Admin"});
    setBlogCount(result.total);
  };
  const fetchPurchaseCount = async () => {
    const result = await purchasecount({roleAlias:"Super Admin"});
    setPropertyPurchaseCount(result.total);
  };
  const fetchUserCount = async () => {
    const result = await usercount({roleAlias:"Super Admin"});
    setUserCount(result.total);
  };

useEffect(()=>{
  fetchPropertyCount()
  fetchBlogCount()
  fetchPurchaseCount()
  fetchUserCount()
  fetchProperty()
},[])


  const isActive = (type) => {
    if (!rangePickerValue) {
      return '';
    }

    const value = getTimeDistance(type);

    if (!value) {
      return '';
    }

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }

    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }

    return '';
  };

  let salesPieData;

  if (salesType === 'all') {
    salesPieData = data?.salesTypeData;
  } else {
    salesPieData = salesType === 'online' ? data?.salesTypeDataOnline : data?.salesTypeDataOffline;
  }

  const menu = (
    <Menu>
      <Menu.Item>操作一</Menu.Item>
      <Menu.Item>操作二</Menu.Item>
    </Menu>
  );
  const dropdownGroup = (
    <span className={styles.iconGroup}>
      <Dropdown overlay={menu} placement="bottomRight">
        <EllipsisOutlined />
      </Dropdown>
    </span>
  );

  const handleChangeSalesType = (e) => {
    setSalesType(e.target.value);
  };

  const handleTabChange = (key) => {
    setCurrentTabKey(key);
  };

  const activeKey = currentTabKey || (data?.offlineData[0] && data?.offlineData[0].name) || '';
  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} property={property} blogCount={blogCount} userCount={userCount} propertyPurchaseCount={propertyPurchaseCount} visitData={data?.visitData || []} />
        </Suspense>

        {/* <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={data?.salesData || []}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={loading}
            selectDate={selectDate}
          />
        </Suspense> */}

{/* 
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                loading={loading}
                visitData2={data?.visitData2 || []}
                searchData={data?.searchData || []}
                dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
          </Col>
        </Row> */}
        <DonutPlot saleCount={saleCount} rentCount={rentCount}/>
        <CategoryChart/>
        <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={data?.offlineData || []}
            offlineChartData={data?.offlineChartData || []}
            handleTabChange={handleTabChange}
          />
        </Suspense>
      </>
    </GridContent>
  );
};

export default Analysis;
