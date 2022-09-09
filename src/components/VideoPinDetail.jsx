import { Flex } from "@chakra-ui/react";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

function VideoPinDetail() {
    return ( <Flex
        width={'full'}
        height="auto"
        justifyContent={'center'}
        alignItems={'center'}
        direction="column"
        py={2}
        px={4}
    > 
        <Flex alignItems={'center'} width={'full'} my={4}>
            <Link to={"/"}>
                <IoHome fontSize={25}/>
            </Link>
        </Flex>
    </Flex> );
}

export default VideoPinDetail;