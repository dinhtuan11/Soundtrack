import PropTypes from 'prop-types'
import { Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { t } from 'i18next'

function SectionTitle({children, title, seeAll}) {
  return (
    <div>
        <div className="my-4 mt-10 pl-2 flex items-center justify-between">
            <Typography variant="h3" className="font-manrope-600">{title}</Typography>
            {seeAll?<Link to={seeAll}>
                <Typography variant="h5" className="font-semibold text-primary transition-all hover:text-gray-600">
                    {t('home.see_all')}
                </Typography>
            </Link>:null}
        </div>
        {children}
    </div>
  )
}

SectionTitle.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    seeAll: PropTypes.string
}

export default SectionTitle

