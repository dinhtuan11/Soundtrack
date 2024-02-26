import { t } from "i18next";
import SlideBanner from "src/components/carousel/SlideBanner";
import SectionElement from "src/components/sectionElement/SectionElement";
import PopularSong from "src/components/songs/PopularSong";
import RecentComponent from "src/components/sidebar/RecentComponent";
import useTitle from "src/hooks/useTitle";
import PopularReleases from "src/components/popular/PopularReleases";
import { useSetBreadcrumb } from "src/hooks/useSetBreadcrumb";
import RencentPlay from "src/components/sidebar/RencentPlay";
const Home = () => {
  useTitle(t("home.title"));
  useSetBreadcrumb([{
    title:t("home.home_page"),
    url:'/'
  }])
  return (
    <div className="flex">
      <div className="flex-1 px-6 py-3 bg-section_bg h-[90vh] overflow-y-scroll custom-scrollbar ">
            <SlideBanner />
            <SectionElement title={t('home.popular')} seeAll="#">
                <PopularSong/>
            </SectionElement>
            <PopularReleases/>
        </div>
        <RecentComponent/>
        <RencentPlay/>
    </div>
  );
}
export default Home;