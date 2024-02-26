import { useQuery } from "@tanstack/react-query";
import ArtistDetailPage from "./ArtistDetailPage";
import { getRequest } from "src/utils/CommonRequest";
import { API_URL } from "src/config/constants";
import { useParams } from "react-router-dom";
import { useSetBreadcrumb } from "src/hooks/useSetBreadcrumb";
import { t } from "i18next";
import RencentPlay from "src/components/sidebar/RencentPlay";

const ArtistDetailContainer = () => {
    const {id} = useParams();
    useSetBreadcrumb([
        {
          title: t("home.home_page"),
          url:'/'
        },
        {
          title:t("home.artist"),
          url:"/artist"
        }
        ,
        {
          title:t("home.detail"),
          url:"#"
        }
      ])
    const { isLoading, data: artist } = useQuery(["artistDetail", id], async ()=>{
        try {
            const response = await getRequest(API_URL.DETAIL_ARTIST, {
                artist_id: id
            });
            return response.data
        } catch (error) {
            console.log('error: ', error);
            
        }
    }, {
        keepPreviousData: true,
    });
    return (
        <div>
            <RencentPlay />
            <ArtistDetailPage artist={artist?.[0]} isLoading={isLoading}/>
        </div>
    );
};

export default ArtistDetailContainer;