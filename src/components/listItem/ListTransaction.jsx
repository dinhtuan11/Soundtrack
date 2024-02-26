import { Tooltip } from "@material-tailwind/react";

const ListTransaction = () => {
  return (
    <tr className="border-b text-center dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <p className="w-44 overflow-hidden truncate text-left">
          <Tooltip
            content={"abc"}
            className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-dark"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            Abc
          </Tooltip>
        </p>
      </th>
      <td className="px-4 py-3">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
          Abc
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
          Abc
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
          20-12-2003
        </span>
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <span className="bg-primary-100 text-primary-800 text-sm font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
          20.000đ
        </span>
      </td>
    </tr>
  );
};

export default ListTransaction;
