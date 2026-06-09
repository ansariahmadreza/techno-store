import Container from "../Container";
import SwiperCar from "./components/mainPage/helper/SwiperCar";
import Slider from "./components/mainPage/helper/Slider";


const home = () => {

    return (
        <section>
            <Slider />
            <Container>
                <section>
                    <SwiperCar />
                </section>
            </Container>
        </section>
    )

};

export default home;