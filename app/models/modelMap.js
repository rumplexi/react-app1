import P5sketch1 from './p5sketch1'
import P5sketch2 from './p5sketch2'
import testImage1 from './images/sketch1.png'
import testImage2 from './images/sketch2.jpg'
import testImage3 from './images/sketch3.webp'
import testImage4 from './images/sketch4.jpg'
import testImage5 from './images/Slot.png'
import testImage6 from './images/sketch6.jpg'

const modelMap = {
    1: {
        title: "Bouncing balls",
        image: testImage1,
        model: P5sketch1
    },
    2: {
        title: "Network visualized",
        image: testImage2,
        model: P5sketch2
    },
    3: {
        title: "Predator and prey",
        image: testImage3,
        model: P5sketch1
    },
    4: {
        title: "Forest fire",
        image: testImage4,
        model: P5sketch2
    }
}

export default modelMap;