import { loginUserAccount } from "../../apis/AuthApis/accountLogin";
import  supabase  from "../../lib/supabase";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import LogoComponent from "../../components/AuthComponents/LogoComponent";
import InputField from "../../components/AuthComponents/InputField";
import CustomAlert from "../../components/BaseComponents/Alert/CustomAlert";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

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

  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };

  const handleSignIn = async () => {
    if (validateForm()) {
      setIsLoading(true);

      const { data, error } = await loginUserAccount(
        formData.email,
        formData.password
      );

      setIsLoading(false);

      if (error) {
        showAlert(error, "error");
      } else {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          showAlert("Login successful, but could not verify session.", "error");
        } else if (sessionData?.session) {
          const { user } = sessionData.session;
          showAlert("Login successful!");
          setTimeout(() => {
            setAlertVisible(false);
            router.replace("/Home");
          }, 1500);
        } else {
          showAlert("Login successful, but no active session found.", "error");
        }
      }
    }
  };
  

  const navigateToSignUp = () => {
    router.replace("/SignUp");
  };

  const navigateToForgotPassword = () => {
    // Navigate to forgot password screen
    // router.push('/ForgotPassword')
  };

  return (
    <SafeAreaView className="bg-backgroundLight h-full py-16 px-5">
      <View className="flex flex-row items-center gap-6 justify-center mb-10">
        <LogoComponent />
        <Text className="font-pbold text-primary text-3xl tracking-widest">
          KitabiBuddy
        </Text>
      </View>

      <View className="mt-6">
        <Text className="font-pbold text-2xl text-textPrimary mb-2">
          Sign In
        </Text>
        <Text className="font-pregular text-textSecondary mb-8">
          Welcome back! Please sign in to continue
        </Text>

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
          onPress={navigateToForgotPassword}
          className="self-end mb-6"
        >
          <Text className="font-pregular text-primary">Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignIn}
          disabled={isLoading}
          className={`rounded-lg py-4 flex-row justify-center items-center ${isLoading ? "bg-primary-light" : "bg-primary"}`}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF7FF" />
          ) : (
            <Text className="font-pmedium text-white text-center">Sign In</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-8">
          <Text className="font-pregular text-textSecondary">
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={navigateToSignUp}>
            <Text className="font-pmedium text-primary">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
}

export default SignIn;
