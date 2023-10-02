import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StPeter_Logo from "../assets/StPeter-Logo.webp";
import PasswordIcon from "../assets/icons/Icon_Password.png";
import userIcon from "../assets/icons/Icon_User.ico";
import { useNavigate } from "react-router-dom";
import { AuthEmployee, AuthEmployeeSchema } from "../schema/AuthEmployeeSchema";
import {
  ButtonLayout,
  FlexLeftBG,
  FlexRightBG,
  FormControlRes,
  HeadingLayout,
  InputLayout,
  leftBG,
} from "./layout/LoginLayout";
import useAuthenticate from "../hooks/useAuthenticate";
import { UseNavHeaderStore } from "../state-management/UseNavHeaderStore";

const Login = () => {
  const navigate = useNavigate();
  const useSetHeaderTitle = UseNavHeaderStore((a) => a.setTitle);

  const [TestError, SetTestError] = useState("");

  const { mutate, data, isLoading, isSuccess, isError, response } =
    useAuthenticate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthEmployeeSchema>({
    resolver: zodResolver(AuthEmployee),
  });

  const onSubmitEmployee = (Emp: AuthEmployeeSchema) => {
    mutate(Emp);
  };

  const testLogin = (Emp: AuthEmployeeSchema) => {
    if (
      Emp.userName.toLocaleUpperCase() === "ADMIN" &&
      Emp.password.toLocaleUpperCase() === "ADMIN"
    ) {
      navigate("/");
      localStorage.setItem("userName", "Admin");
    } else {
      SetTestError("Username or Password is incorrect!");
    }
  };

  useEffect(() => {
    if (data && !isError && !isLoading) {
      navigate("/");
      localStorage.setItem("userName", data.firstName);

      // sessionStorage.setItem("userName", data.firstName);
    }
  });

  return (
    <Flex height={"100vh"}>
      <Box {...leftBG}>
        <Flex sx={FlexLeftBG}>
          <Box textAlign="center" flex="2">
            <Heading
              size={{
                md: "2xl",
                lg: "3xl",
              }}
              letterSpacing={2}
            >
              ST. PETER
            </Heading>
            <Text
              fontSize={{
                md: "2xl",
                lg: "3xl",
              }}
            >
              Report Management System
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box flex="1">
        <Flex sx={FlexRightBG}>
          <Image src={StPeter_Logo} width="190px" pb={4} />
          <Heading {...HeadingLayout}>Login Account</Heading>
          <Box width="320px">
            <form onSubmit={handleSubmit(testLogin)}>
              <FormControl id="Username" pb={1} {...FormControlRes}>
                <FormLabel color="green.700"> Username </FormLabel>
                <InputGroup>
                  <InputLeftElement boxSize="1.8rem" mt={1.5} paddingLeft={2}>
                    <Image src={userIcon} />
                  </InputLeftElement>
                  <Input
                    isRequired
                    {...InputLayout}
                    {...register("userName")}
                    placeholder="Type your username"
                  />
                </InputGroup>
                {errors.userName && (
                  <Text color="red.600" paddingY={2} colorScheme="red">
                    {errors.userName.message}
                  </Text>
                )}
              </FormControl>

              <FormControl id="Password" pb={2} {...FormControlRes}>
                <FormLabel color="green.700"> Password </FormLabel>
                <InputGroup>
                  <InputLeftElement boxSize="1.8rem" mt={1.5} paddingLeft={2}>
                    <Image src={PasswordIcon} />
                  </InputLeftElement>
                  <Input
                    isRequired
                    {...InputLayout}
                    {...register("password")}
                    type="password"
                    placeholder="Type your password"
                  />
                </InputGroup>
                {errors.password && (
                  <Text color="red.600" paddingY={2} colorScheme="red">
                    {errors.password.message}
                  </Text>
                )}
              </FormControl>

              {/* {response && (
                <Alert marginBottom={3} status="warning">
                  <AlertIcon />
                  {response}
                </Alert>
              )} */}
              {TestError && (
                <Alert fontSize="sm" marginBottom={3} status="warning">
                  <AlertIcon />
                  {TestError}
                </Alert>
              )}

              <Button {...ButtonLayout} type="submit">
                LOGIN
              </Button>
              <Text textAlign="center" color="green.700" paddingBottom={2}>
                Forgot password?
              </Text>
            </form>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
