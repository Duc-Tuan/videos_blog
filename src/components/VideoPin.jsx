import {
  Flex,
  Text,
  useColorModeValue,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import { getFirestore } from "firebase/firestore";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firebaseApp } from "../firebase-config";
import { getUserInfo } from "../utils/fetchData";

const avatar = "https://ak.picdn.net/contributors/3038285/avatars/thumb.jpg?t=165670519";

function VideoPin({ data }) {
  const firestoreDb = getFirestore(firebaseApp);

  const { colorMode } = useColorMode();
  const bg = useColorModeValue("blackAlpha.700", "gray.300");
  const textColor = useColorModeValue("gray.100", "gray.100");

  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (data) setUserId(data.userId);
    if (userId)
      getUserInfo(firestoreDb, userId).then((data) => {
        setUserInfo(data);
      });
  }, [userId]);

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems="center"
      direction={"column"}
      cursor={"pointer"}
      shadow={"lg"}
      _hover={{ shadow: "xl" }}
      rounded="md"
      overflow={"hidden"}
      position="relative"
      maxWidth={"300px"}
      bg="gray.200"
    >
      <Link to={`/videoDetail/${data.id}`}>
        <video
          src={data.videoUrl}
          muted
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
        />
      </Link>

      <Flex
        position={"absolute"}
        bottom="0"
        left="0"
        p={bg}
        width="full"
        direction={"column"}
      >
        <Flex
          width={"full"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Text color={textColor} fontSize={20}>
            {data.title}
          </Text>

          <Link to={`/UserDetail/${userId}`}>
            <Image
              src={userInfo?.photoURL ? userInfo.photoURL : avatar}
              rounded="full"
              width={"50px"}
              height={"50px"}
              border="2px"
              borderColor={bg}
              mt={-10}
              minHeight={"50px"}
              minWidth={"50px"}
            />
          </Link>
        </Flex>

        <Text fontSize={12} color={textColor} ml="auto">
          {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
        </Text>
      </Flex>
    </Flex>
  );
}

export default VideoPin;
