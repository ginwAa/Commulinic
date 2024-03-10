import {useState} from 'react';
import axios from 'axios';

// const Inner = () => {
//     return (
//         <div>
//             <About/>
//         </div>
//     );
// }
const About = () => {
    const [introData, setIntroData] = useState(null);

    useEffect(() => {
        // 从后端获取医院简介数据
        axios.get('/api/hospital-intro')
            .then(response => {
                setIntroData(response.data);
            })
            .catch(error => {
                console.error('Error fetching hospital intro data:', error);
            });
    }, []);

    return (
        <div>
            {/*{introData && (*/}
            {/*    <div>*/}
            {/*        <div dangerouslySetInnerHTML={{ __html: introData.__html }} />*/}

            {/*        {introData.images.map(imageUrl => (*/}
            {/*            <img src={imageUrl} alt="Hospital Image" key={imageUrl} />*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default About;
