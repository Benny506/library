import { GiBlackBook } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { BsSave } from "react-icons/bs";

export const features = [
    {
        Icon: () => <GiBlackBook color="#FFF" size={30} />,
        bgColor: '#5B72EE',
        title: 'Free E-books',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor'
    },
    {
        Icon: () => <FaEdit color="#FFF" size={30} />,
        bgColor: '#00CBB8',
        title: 'Custom Notes',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor'
    },
    {
        Icon: () => <BsSave color="#FFF" size={30} />,
        bgColor: '#29B9E7',
        title: 'Save For Later',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor'
    }
]