
import { styled, Box, Typography } from '@mui/material';

// const Image = styled(Box)`
//     width: 100%;

//     height: 50vh;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
// `;
const Image = styled('img')({
    width: '70%',
    // height: '200px',
    display: 'flex',
    margin: 'auto',
    padding: '5px 5px 5px 5px'
  });
const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

const Banner = () => {
    const imgurl = 'https://i.ibb.co/HncKccN/image.png';
    return (
        <Image src={imgurl} alt='Banner' />
        //     <Heading>BLOG</Heading>
        //     <SubHeading>Code for Interview</SubHeading>
        // </Image>
    )
}

export default Banner;