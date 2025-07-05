<<<<<<< HEAD
import { View, Text, TouchableOpacity, ActivityIndicator,ScrollView } from "react-native";
=======
import { View, Text, TouchableOpacity, ActivityIndicator , ScrollView } from "react-native";
>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { router } from "expo-router";
import LogoComponent from "../../components/AuthComponents/LogoComponent";
import InputField from "../../components/AuthComponents/InputField";
<<<<<<< HEAD
=======
import { createUserAccount } from "../../apis/AuthApis/accountCreation";
import supabase from "../../lib/supabase";
import CustomAlert from "../../components/BaseComponents/Alert/CustomAlert";

>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
=======
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

<<<<<<< HEAD
  // const handleSignUp = async () => {
  //   if (validateForm()) {
  //     setIsLoading(true);
  //     const { data, error } = await createUserAccount(
  //       formData.email,
  //       formData.password,
  //       formData.username
  //     );

  //     // const { data, error } = await loginUser(formData.email, formData.password);
  //     setIsLoading(false);

  //     if (error) {
  //       alert(error);
  //     } else {
  //       alert("Login successful!");
  //       
  //       // router.replace("/Home");
  //     }

      //   setIsLoading(true);
      //   // Simulate API call
      //   setTimeout(() => {
      //     setIsLoading(false);
      //     // Navigate to home or handle authentication
      //   }, 2000);
  //   }
  // };
  const handleSignUp = async () => {
    if (validateForm()) {
      setIsLoading(true);

=======
  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };


  const handleSignUp = async () => {
    if (validateForm()) {
      console.log("In Handle Sign UP");
      setIsLoading(true);
  
>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2
      const { data, error } = await createUserAccount(
        formData.email,
        formData.password,
        formData.username
      );
<<<<<<< HEAD

      setIsLoading(false);

      if (error) {
        alert(error);
      } else {
        // Check Supabase session
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          alert(
            "Signup successful, but could not verify session. Please login."
          );
          router.replace("/SignIn");
        } else if (sessionData?.session) {
          alert("Signup successful!");
          router.replace("/Home");
        } else {
          alert("Signup successful, but no active session found.");
          router.replace("/SignIn");
=======
  
      setIsLoading(false);
  
      if (error) {
        showAlert(error, "error");
      } else {
        console.log('In the Else part ')
        // Corrected: get session and error properly
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log("Session Data:", session);
  
        if (sessionError) {
          showAlert("Signup successful, but session verification failed.", "error");
          setTimeout(() => {
            setAlertVisible(false);
            router.replace("/SignIn");
          }, 1500);
        } else if (session) {
          showAlert("Signup successful!");
          setTimeout(() => {
            setAlertVisible(false);
            router.replace("/Home");
          }, 1500);
        } else {
          showAlert("Signup successful, but no active session found.", "error");
          setTimeout(() => {
            setAlertVisible(false);
            router.replace("/SignIn");
          }, 1500);
>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2
        }
      }
    }
  };
  



  const navigateToSignIn = () => {
    router.replace("/SignIn");
  };

  return (
    <SafeAreaView className="bg-backgroundLight h-full py-16 px-5">
<<<<<<< HEAD
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center gap-6 justify-center mb-10">
          <LogoComponent />
          <Text className="font-pbold text-primary text-3xl tracking-widest">
            KitabiBuddy
          </Text>
        </View>

        <View className="mt-6">
          <Text className="font-pbold text-2xl text-textPrimary mb-2">
            Sign Up
          </Text>
          <Text className="font-pregular text-textSecondary mb-8">
            Create an account to get started
          </Text>

          <InputField
            label="Username"
            value={formData.username}
            onChangeText={(text) => handleChange("username", text)}
            placeholder="Enter your username"
            error={errors.username}
          />

          <InputField
            label="Email"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Enter your email"
            keyboardType="email-address"
            error={errors.email}
          />

          <InputField
            label="Password"
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            placeholder="Enter your password"
            secureTextEntry={true}
            error={errors.password}
          />

          <TouchableOpacity
            onPress={handleSignUp}
            disabled={isLoading}
            className={`rounded-lg py-4 flex-row justify-center items-center mt-6 ${
              isLoading ? "bg-primary-light" : "bg-primary"
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF7FF" />
            ) : (
              <Text className="font-pmedium text-white text-center">
                Sign Up
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-8">
            <Text className="font-pregular text-textSecondary">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={navigateToSignIn}>
              <Text className="font-pmedium text-primary">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
=======
      <ScrollView>
      <View className="flex flex-row items-center gap-6 justify-center mb-10">
        <LogoComponent />
        <Text className="font-pbold text-primary text-3xl tracking-widest">
          KitabiBuddy
        </Text>
      </View>

      <View className="mt-6">
        <Text className="font-pbold text-2xl text-textPrimary mb-2">
          Sign Up
        </Text>
        <Text className="font-pregular text-textSecondary mb-8">
          Create an account to get started
        </Text>

        <InputField
          label="Username"
          value={formData.username}
          onChangeText={(text) => handleChange("username", text)}
          placeholder="Enter your username"
          error={errors.username}
        />

        <InputField
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="Enter your email"
          keyboardType="email-address"
          error={errors.email}
        />

        <InputField
          label="Password"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          placeholder="Enter your password"
          secureTextEntry={true}
          error={errors.password}
        />

        <TouchableOpacity
          onPress={handleSignUp}
          disabled={isLoading}
          className={`rounded-lg py-4 flex-row justify-center items-center mt-6 ${
            isLoading ? "bg-primary-light" : "bg-primary"
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF7FF" />
          ) : (
            <Text className="font-pmedium text-white text-center">Sign Up</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-8">
          <Text className="font-pregular text-textSecondary">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={navigateToSignIn}>
            <Text className="font-pmedium text-primary">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>

      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  
>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2
  );
}

export default SignUp;
