import supabase from "../../lib/supabase";

// Function to create a new user account
export const createUserAccount = async (email, password, username) => {
  try {
    console.log("Creating User Account");

    // Step 1: Sign up user in auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: username, // Goes to auth.users.user_metadata
        },
      },
    });

    if (signUpError || !signUpData.user) {
      return { error: signUpError?.message || "Signup failed" };
    }

    // Step 2: Re-fetch user to ensure metadata is available
    const {
      data: { user },
      error: userFetchError,
    } = await supabase.auth.getUser();

    if (userFetchError || !user) {
      return { error: userFetchError?.message || "Failed to fetch user" };
    }

    // Step 3: Upsert into custom users table
    const { error: upsertError } = await supabase
      .from("users")
      .upsert(
        [
          {
            id: user.id,
            full_name: username,
            email: user.email,
          },
        ],
        { onConflict: "id" } // Avoid duplicate key error
      );

    if (upsertError) {
      return { error: upsertError.message };
    }

    return { data: signUpData };
  } catch (err) {
    return { error: err.message };
  }
};
