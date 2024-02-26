import PropTypes from 'prop-types'
import DialogMultimedia from './DialogMultimedia'
import { t } from 'i18next'
import { Button, DialogBody, DialogFooter, Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

function DialogLogin({isOpen, setOpen }) {
  return (
    <div>
      <DialogMultimedia isOpen={isOpen} setOpen={setOpen} titleHeading={t("home.not_login")} sizeTitle='h6'>
        <DialogBody className='flex justify-center text-center flex-col gap-5'>
            <Typography variant='h5'>{t("auth.go_to_login")}</Typography>
        </DialogBody>
        <DialogFooter className='flex justify-center text-center gap-5'>
            <Button onClick={()=>setOpen(pre=>!pre)} variant='outlined'>{t("auth.close")}</Button>
            <Button className='bg-primary'><Link to="/login">{t("auth.login_now")}</Link></Button>
        </DialogFooter>
      </DialogMultimedia>
    </div>
  )
}

DialogLogin.propTypes = {
    isOpen:PropTypes.bool, 
    setOpen: PropTypes.func
}

export default DialogLogin

