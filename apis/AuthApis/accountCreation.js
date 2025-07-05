import supabase from "../../lib/supabase";

// Function to create a new user account
export const createUserAccount = async (email, password, username) => {
  try {
<<<<<<< HEAD
    // Step 1: Sign up user in auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            full_name: username, // Goes to auth.users.user_metadata
          },
        },
      }
    );
=======
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
>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2

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

<<<<<<< HEAD
    // Step 3: Insert into custom users table
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id,
        full_name: username,
        email: user.email,
      },
    ]);

    if (insertError) {
      return { error: insertError.message };
=======
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
>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2
    }

    return { data: signUpData };
  } catch (err) {
    return { error: err.message };
  }
};
