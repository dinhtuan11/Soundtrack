import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { basePath } from "src/config/constants";
import { useState } from "react";
import SongItemPop from "src/components/songs/SongItemPop";
import LoadingPopularRelease from "src/components/loadingSkeleton/LoadingPopularRelease";
import AlbumSong from "./AlbumSong";
import { t } from "i18next";

const ArtistDetailPage = ({ artist, isLoading }) => {
  const [activeTab, setActiveTab] = useState("song");
  const data = [
    {
      label: t("home.song_Detail"),
      value: "song",
    },
    {
      label: t("home.music_Collection"),
      value: "album",
    },
  ];
  return (
    <section className="min-w-screen mx-auto w-full p-2 lg:px-10 lg:pt-10  xl:block overflow-y-scroll md:overscroll-y-none none-display-scrollbar h-[72vh]">
      <div className="flex flex-col lg:flex-row w-[-webkit-fill-available] lg:gap-[118px]">
        <div className="flex flex-col items-center justify-start tablet:mb-5">
          <div className="relative gap-4 lg:flex lg:flex-col">
            <div>
              <img
                src={basePath + artist?.avatar}
                alt="cover album"
                className="object-cover mx-auto rounded-lg lg:w-72 lg:h-72 w-60 h-60"
              />
            </div>
            <div className="flex flex-col gap-3 text-left text-gray-900 lg:text-gray-600 xl:text-center ">
              <div>
                <Typography variant="h2" className="text-center">
                  {artist?.name??""}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div>
            <Tabs value={activeTab}>
              <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 z-0"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
              >
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={activeTab === value ? "border-primary" : ""}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                <>
                  <TabPanel value={"song"} className=" overflow-y-scroll max-h-[580px] custom-scrollbar">
                    <div className="grid grid-cols-3 gap-4">
                      {isLoading ? (
                        <LoadingPopularRelease/>
                      ) : (
                        artist?.songs.map((song) => (
                          <SongItemPop
                            song={{
                              ...song,
                              song_name: song?.title,
                              song_id: song?.id,
                              song_path: song?.file_path,
                            }}
                            key={song?.id}
                          />
                        ))
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel value={"album"} className=" overflow-y-scroll max-h-[580px] custom-scrollbar">
                    <div className="flex flex-wrap gap-4">
                    {isLoading ? (
                        <LoadingPopularRelease/>
                      ) : (
                      artist?.albums.map((album) => (
                        <AlbumSong album={album} key={album?.id}/>
                      ))
                      )}
                    </div>
                  </TabPanel>
                </>
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};
ArtistDetailPage.propTypes = {
  artist: PropTypes.object,
  isLoading:PropTypes.bool
};
export default ArtistDetailPage;
