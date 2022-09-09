import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button, Flex, HStack, Img } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { firebaseApp } from "../firebase-config";
import { doc, getFirestore, setDoc} from 'firebase/firestore'; 

import bg from "../images/bg.webp";

function Login() {
  const firebaseAuth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const firebaseData = getFirestore(firebaseApp);

  const navigate = useNavigate();

  const Login = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;

    localStorage.setItem('user', JSON.stringify(providerData));
    localStorage.setItem('accessToken', JSON.stringify(refreshToken));

    await setDoc(
      doc(firebaseData, 'users', providerData[0].uid),
      providerData[0]
    );

    navigate('/', { replace: true } );
  };

  return (
    <Flex
      justifyContent={"center"}
      align={"center"}
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
    >
      <Img src={bg} objectFit="cover" width={"full"} height={"full"} />
      <Flex
        position={"absolute"}
        width={"100vw"}
        height={"100vh"}
        bg={"blackAlpha.600"}
        top={"0"}
        left={"0"}
        justifyContent={"center"}
        align={"center"}
      >
        <HStack>
          <Button
            leftIcon={<FcGoogle fontSize={25} />}
            colorScheme="whiteAlpha"
            shadow={"lg"}
            onClick={() => Login()}
          >
            Signin with Google
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default Login;
