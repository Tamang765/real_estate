import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
import { useEffect } from 'react';
import { purchasecount } from '../service';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading, visitData ,property,blogCount,userCount,propertyPurchaseCount}) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Property Count"
        action={
          <Tooltip title="Property Count">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={property}
        // footer={<Field label="日Views" value={numeral(1234).format('0,0')} />}
        contentHeight={46}
      >
        <TinyArea
          color="#975FE4"
          xField="x"
          height={46}
          forceFit
          yField="y"
          smooth
          // data={visitData}
        />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Blogs Count"
        action={
          <Tooltip title="Blogs Count">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={blogCount}
        // footer={<Field label="Conversion rate" value="60%" />}
        contentHeight={46}
      >
        <TinyColumn xField="x" height={46} forceFit yField="y"  />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Users Count"
        action={
          <Tooltip title="Users Count">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={userCount}
        // footer={<Field label="Conversion rate" value="60%" />}
        contentHeight={46}
      >
        <TinyColumn xField="x" height={46} forceFit yField="y"  />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Booked Property  Count"
        action={
          <Tooltip title="Booked Property Count">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={propertyPurchaseCount}
        // footer={<Field label="Conversion rate" value="60%" />}
        contentHeight={46}
      >
        <TinyColumn xField="x" height={46} forceFit yField="y" />
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
