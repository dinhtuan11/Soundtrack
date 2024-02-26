import { Button, Input, Typography } from "@material-tailwind/react";
import { t } from "i18next";
import { useState } from "react";
import { BsHeadphones } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import logo from "src/assets/images/logo.png";

const SearchItems = () => {
  const items = [
    {
      id: 1,
      title: "Shape of You",
      artist: "Ed Sheeran",
      listens: 1000000,
      releaseDate: "2023-09-05",
      image: logo,
    },
    {
      id: 2,
      title: "Blinding Lights",
      artist: "The Weeknd",
      listens: 800000,
      releaseDate: "2023-09-07",
      image: logo,
    },
    {
      id: 3,
      title: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      listens: 700000,
      releaseDate: "2023-09-08",
      image: logo,
    },
  ];
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="w-full">
      <div className="relative flex  h-8 gap-2 justify-center items-center">
        <Input
          type="search"
          className="pl-10 !border border-primary bg-white text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-primary"
          containerProps={{
            className: "",
          }}
          labelProps={{
            className: "hidden",
          }}
          placeholder="Search here ..."
          value={searchText}
          onChange={handleSearchChange}
        />
        <Button
          size="sm"
          className="!absolute left-1 top-1 rounded p-0 bg-transparent shadow-none border-none hover:shadow-none hover:border-none  text-primary"
        >
          <FiSearch size={25} />
        </Button>
      </div>
      {searchText ? (
        <ul className="w-full rounded-sm shadow">
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((song) => (
              <li key={song.id} className="border-b-2 border-b-gray-600 p-4">
                <a href="#">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                    <img src={song.image} alt="avt" className="w-8 h-8 rounded-full object-cover"/>
                      <div>
                      <h3 className="font-semibold text-primary hover:text-black transition-colors text-ellipsis">{song.title}</h3> 
                      <p className="text-gray-400 text-sm w-4/5 truncate">{song.artist}</p>
                      </div>
                    </div>
                    <Typography className="flex gap-1 items-center"><BsHeadphones />{song.listens}</Typography>
                    <Typography className="sm:block hidden">{song.releaseDate}</Typography>
                  </div>
                </a>
              </li>
            ))
          ) : (
            <li className="text-center p-4"> {`${t("client.cannot_find_results")} "${searchText}"`}</li>
          )}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchItems;