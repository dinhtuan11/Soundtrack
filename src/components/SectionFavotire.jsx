import { useState } from 'react'
import { Button, Tooltip } from '@material-tailwind/react'
import ListPlaylist from './profile/listPlaylist/ListPlaylist';
import ProfileSong from './profile/ProfileSong';
import { t } from 'i18next';
import { GiLoveSong } from 'react-icons/gi';
import { RiPlayList2Line } from 'react-icons/ri';

function SectionFavotire() {
  const [toggleTabs, setToggleTabs] = useState("song");

    const renderContent = () =>{
        switch (toggleTabs){
          case "song":
            return (
              <div>
                <ProfileSong/>
              </div>
            );
          case "playlist":
            return (
              <div className="flex flex-wrap gap-6 pb-7">
                <ListPlaylist />
              </div> 
            )
          default:
            return null
        }
    }
  return (
    <div className="pt-5 w-full gap-4">
            <div className="flex justify-center gap-20 pb-4">
              <div>
                <Tooltip className="bg-white text-gray-900 shadow-lg" content={t('profile.song')}>
                  <Button
                    className={`${
                      toggleTabs === "song"
                        ? "bg-primary"
                        : "bg-transparent text-black"
                    } rounded-3xl`}
                    onClick={() => setToggleTabs("song")}
                  >
                    <span className='mobile-lg:hidden block'>{t('profile.song')}</span> <GiLoveSong size={20} className='mobile-lg:block hidden'/>
                  </Button>
                </Tooltip>
              </div>
              <div>
                <Tooltip content={t('profile.playlist')} className="bg-white text-gray-900 shadow-lg">
                  <Button
                    className={`${
                      toggleTabs === "playlist"
                        ? "bg-primary"
                        : "bg-transparent text-black"
                    } rounded-3xl`}
                    onClick={() => setToggleTabs("playlist")}
                  >
                    <span className='mobile-lg:hidden block'>{t('profile.playlist')}</span> <RiPlayList2Line size={20} className='mobile-lg:block hidden'/>
                  </Button>
                </Tooltip>
              </div>
            </div>
            <div className="max-h-[440px] overflow-auto custom-scrollbar w-full pb-3">
              {renderContent()}
            </div>
          </div>
  )
}

SectionFavotire.propTypes = {

}

export default SectionFavotire

