import { Pie } from "@ant-design/charts";

const DonutPlot = ({saleCount, rentCount}) => {
    console.log(saleCount);
    const data = [
        {
          type: 'Rental Property',
          value: saleCount,
        },
        {
          type: 'Sale Property',
          value: rentCount,
        },
      ];
      const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            content: 'AntV\nG2Plot',
          },
        },
      };
  return (
    <Pie {...config}/>
  )
}

export default DonutPlot