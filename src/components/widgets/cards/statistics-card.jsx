import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    CardFooter,
  } from "@material-tailwind/react";
  import PropTypes from "prop-types";
  
  export function StatisticsCard({items, data}) {
    return (
      <Card>
        <CardHeader
          variant="gradient"
          color={items.color}
          className="absolute -mt-4 grid h-16 w-16 place-items-center"
        >
          {items?.icon ?? <></>}
        </CardHeader>
        <CardBody className="p-4 text-right">
          <Typography variant="small" className="font-normal text-blue-gray-600">
            {items?.title}
          </Typography>
          <Typography variant="h4" color="blue-gray">
            {data?.count}
          </Typography>
          {data?.sum_vip && (
            <Typography variant="small" color="blue-gray">
            {'Người dùng vip: '+ data?.sum_vip}
          </Typography>
          )}
        </CardBody>
          <CardFooter className="border-t border-blue-gray-50 p-4 text-right">
          <Typography className="font-normal text-blue-gray-600">
            <strong className="text-green-400">+ {data?.create_today}</strong>
            &nbsp;{"/ Hôm nay"}
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            <strong className="text-green-400">+ {data?.create_week}</strong>
            &nbsp;{"/ Tuần"}
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-400">+ {data?.create_month}</strong>
              &nbsp;{"/ Tháng"}
            </Typography>
          </CardFooter>
      </Card>
    );
  }
  
  StatisticsCard.defaultProps = {
    color: "blue",
    footer: null,
  };
  
  StatisticsCard.propTypes = {
    items: PropTypes.object,
    data: PropTypes.object,
    footer: PropTypes.node
  };
  
  
  export default StatisticsCard;
  