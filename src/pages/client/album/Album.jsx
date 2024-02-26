import { IconButton, Menu, MenuHandler, MenuItem, MenuList, Tooltip, Typography } from '@material-tailwind/react'
import { useState } from 'react'
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { ButtonRounded } from 'src/components/ButtonRounded'

function Album() {
    const [heart, setHeart] = useState(false);
    const fake = new Array(20).fill(null);
  return (
    <section className='min-w-screen mx-auto w-full p-2 lg:px-10 lg:pt-10  xl:block overflow-y-scroll md:overscroll-y-none none-display-scrollbar h-[72vh]'>
        <div className='flex flex-col lg:flex-row w-[-webkit-fill-available] lg:gap-[118px]'>
            <div className='flex flex-col items-center justify-start tablet:mb-5'>
                <div className='relative gap-4 lg:flex lg:flex-col'>
                    <div>
                        <img src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1" alt="cover album" className='object-cover mx-auto rounded-lg lg:w-72 lg:h-72 w-60 h-60'/>
                    </div>
                    <div className='flex flex-col gap-3 text-left text-gray-900 lg:text-gray-600 xl:text-center '>
                        <div>
                            <Typography variant='h2' className='text-center'>Hot Trend</Typography>
                            <p className='hidden lg:block'>Update: 27/09/2023</p>
                            <div className='truncate w-72'>
                                <Tooltip content="Ed Sheeran, Meghan Trainor, Jatmes Young" className="bg-white text-black shadow-xl">
                                    Ed Sheeran, Meghan Trainor, Jatmes Young
                                </Tooltip>
                            </div>
                            <p className='hidden lg:block'>170k favorite person</p>
                        </div>
                        <ButtonRounded  bgColor='flex mx-auto justify-center bg-primary text-md text-center mt-2'>RANDOM PLAY</ButtonRounded>
                        <div className='flex justify-center gap-5'>
                            <IconButton onClick={()=> setHeart(pre=>!pre)} className='rounded-full bg-primary'>
                                {heart?<AiTwotoneHeart size={25}/>:<AiOutlineHeart size={25}/>}
                            </IconButton>
                            <Menu placement="bottom-start">
                                <MenuHandler>
                                    <IconButton ripple={false} className='rounded-full bg-primary'>
                                        <BsThreeDots size={25}/>
                                    </IconButton>
                                </MenuHandler>
                                <MenuList className="max-h-[20rem] max-w-[18rem]">
                                    <MenuItem className='hover:bg-primary hover:text-white'>Random</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
                <div className='flex-1'>
                    <div className='flex items-center justify-between p-3 text-white rounded-tl-lg rounded-tr-lg bg-primary'>
                        <Typography variant='h5'>SONG</Typography>
                        <Typography variant='h5' className='pl-20'>ALBUM</Typography>
                        <Typography variant='h5'>TIME</Typography>
                    </div>
                    <div className='none-display-scrollbar overflow-y-scroll max-h-[60vh]'>
                        {fake.map((_, index)=>(
                                    <ListSong  key={index}/>
                        ))}
                    </div>
                </div>
        </div>
    </section>
  )
}

const ListSong = () => {
    return (
        <ul className='border-b-2 boder-2'>
            <li className='flex items-center justify-between p-3 list-none'>
                <div className='flex gap-3'>
                    <img src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1" alt="image song" className='h-16 w-16 rounded-[15px] object-cover' />
                    <div className='pt-2'>
                        <Typography variant='h5'>Perfect</Typography>
                        <p className='text-gray-400'>Ed Sheeran</p>
                    </div>
                </div>
                <Typography variant='h5'>Perfect</Typography>
                <p className='text-gray-400'>2 min ago</p>
            </li>
        </ul>
    )
}

Album.propTypes = {}
ListSong.propTypes = {}

export default Album
