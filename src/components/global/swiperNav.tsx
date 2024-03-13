import { proSwiperBreakpoints, swiperBreakpoints } from "@/utils/values";
import { ReactNode } from "react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";

const SwiperNav = ({
  children,
  pro,
}: {
  children: ReactNode;
  pro: boolean;
}) => {
  return (
    <Swiper
      navigation={true}
      slidesPerView={5}
      grid={{
        rows: 2,
        fill: "row",
      }}
      breakpoints={pro ? proSwiperBreakpoints : swiperBreakpoints}
      spaceBetween={20}
      modules={[Grid, Navigation, Pagination]}
      className="mySwiper"
      // pagination={{
      //   type: 'progressbar',
      // }}
    >
      {children}
    </Swiper>
  );
};

export default SwiperNav;
